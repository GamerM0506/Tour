export default function cloudinaryLoader({ src, width, quality = 'auto' }: { src: string, width: number, quality?: number | string }) {
  const cloudName = 'dcfaz2rme';
  let optimizedWidth = width;
  if (optimizedWidth > 1920) optimizedWidth = 1920;
  else if (optimizedWidth > 1280) optimizedWidth = 1280;
  else if (optimizedWidth > 768) optimizedWidth = 768;

  const params = [
    'f_auto',             
    `q_${quality}`,     
    `w_${optimizedWidth}`,
    'c_limit',         
    'dpr_auto'           
  ].join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${src}`;
}