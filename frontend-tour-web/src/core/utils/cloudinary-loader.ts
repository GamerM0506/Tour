export default function cloudinaryLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    const cloudName = 'dcfaz2rme';
    const params = ['f_auto', 'q_auto', `w_${width}`];

    return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}