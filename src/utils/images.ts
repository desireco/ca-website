import { isUnpicCompatible, unpicOptimizer, astroAssetsOptimizer } from './images-optimization';
import type { ImageMetadata } from 'astro';
import type { OpenGraph } from '@astrolib/seo';

const load = async function () {
  let images: Record<string, () => Promise<unknown>> | undefined = undefined;
  try {
    images = import.meta.glob('~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // continue regardless of error
  }
  return images;
};

let _images: Record<string, () => Promise<unknown>> | undefined = undefined;

/** */
export const fetchLocalImages = async () => {
  _images = _images || (await load());
  return _images;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath;
  }

  try {
    const images = await fetchLocalImages();
    const key = imagePath.replace('~/', '/src/');

    if (images && typeof images[key] === 'function') {
      const result = await images[key]();
      return result && typeof result === 'object' && 'default' in result
        ? (result as { default: ImageMetadata }).default
        : null;
    } else {
      console.warn(`Image not found: ${imagePath}`);
      return imagePath; // Fall back to using the path directly
    }
  } catch (error) {
    console.error(`Error loading image ${imagePath}:`, error);
    return imagePath; // Fall back to using the path directly
  }
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const images = openGraph.images;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | string | undefined;
        if (!resolvedImage) {
          return {
            url: '',
          };
        }

        let _image;

        try {
          if (
            typeof resolvedImage === 'string' &&
            (resolvedImage.startsWith('http://') || resolvedImage.startsWith('https://')) &&
            isUnpicCompatible(resolvedImage)
          ) {
            _image = (await unpicOptimizer(resolvedImage, [defaultWidth], defaultWidth, defaultHeight, 'jpg'))[0];
          } else if (resolvedImage) {
            const dimensions =
              typeof resolvedImage !== 'string' && resolvedImage?.width <= defaultWidth
                ? [resolvedImage?.width, resolvedImage?.height]
                : [defaultWidth, defaultHeight];
            _image = (
              await astroAssetsOptimizer(resolvedImage, [dimensions[0]], dimensions[0], dimensions[1], 'jpg')
            )[0];
          }
        } catch (error) {
          console.error(`Error optimizing image ${image.url}:`, error);
          _image = {
            url: typeof resolvedImage === 'string' ? resolvedImage : '',
            width: defaultWidth,
            height: defaultHeight,
          };
        }

        if (typeof _image === 'object') {
          return {
            url: 'src' in _image && typeof _image.src === 'string' ? String(new URL(_image.src, astroSite)) : '',
            width: 'width' in _image && typeof _image.width === 'number' ? _image.width : undefined,
            height: 'height' in _image && typeof _image.height === 'number' ? _image.height : undefined,
          };
        }
        return {
          url: '',
        };
      }

      return {
        url: '',
      };
    })
  );

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
