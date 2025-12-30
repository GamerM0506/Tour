export default function cloudinaryLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
    const params = ['f_auto', 'q_auto', `w_${width}`];
    return src.replace('/upload/', `/upload/${params.join(',')}/`);
}