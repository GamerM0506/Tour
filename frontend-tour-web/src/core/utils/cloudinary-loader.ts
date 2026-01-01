export default function cloudinaryLoader({
  src,
  width,
  quality
}: {
  src: string,
  width: number,
  quality?: number | string
}) {
  const cloudName = 'dcfaz2rme';
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

  const finalQuality = quality || 'auto:best';

  const params = [
    'f_auto',              
    'q_' + finalQuality,
    'w_' + width,
    'c_fill',
    'g_auto',
    'dpr_auto'
  ].join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${cleanSrc}`;
}