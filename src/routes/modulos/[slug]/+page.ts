import { error } from '@sveltejs/kit';
import { getModule, modules } from '$lib/data/modules';

export const entries = () => modules.map((m) => ({ slug: m.slug }));

export function load({ params }: { params: { slug: string } }) {
  const module = getModule(params.slug);
  if (!module) {
    throw error(404, 'Módulo no encontrado');
  }
  return { moduleId: module.id };
}
