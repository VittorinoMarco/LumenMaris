-- Seed prodotti Lumen Maris (solo Saracenum e Thalasi)

insert into public.products (
  slug, name, tagline, description, price_cents, size, image_url,
  gender, family, badge, top_notes, heart_notes, base_notes, sort_order
) values
(
  'saracenum',
  'Saracenum Uomo',
  'Nato tra le rocce e il mare, affinato negli abissi calabresi',
  'Un profumo maschile, legnoso-marino, affinato nelle profondità del Tirreno. Le note di bergamotto calabrese si fondono con legni arabi caldi e l''acqua di mare che rinfresca e potenzia le essenze botaniche.',
  8900,
  '100ml',
  '/images/Saracenum-conMuretto.png',
  'uomo',
  'legnoso-marino',
  'Primo al Mondo',
  array['Bergamotto', 'Agrumi calabresi'],
  array['Botaniche marine', 'Erbe aromatiche'],
  array['Legni arabi caldi', 'Oud', 'Ambra'],
  1
),
(
  'thalasi',
  'Thalasi Donna',
  'L''onda che profuma, il sole che scalda',
  'Un profumo femminile, fresco-marino, che evoca le onde e i fiori d''arancio. Le note floreali calabresi si intrecciano con il sale marino e legni morbidi per una fragranza elegante e avvolgente.',
  8900,
  '100ml',
  '/images/Thalasi-conMuretto.png',
  'donna',
  'fresco-marino',
  'Primo al Mondo',
  array['Bergamotto', 'Agrumi', 'Fiori calabresi'],
  array['Sale marino', 'Botaniche'],
  array['Legni morbidi', 'Musk', 'Ambra'],
  2
)
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  description = excluded.description,
  price_cents = excluded.price_cents,
  size = excluded.size,
  image_url = excluded.image_url,
  gender = excluded.gender,
  family = excluded.family,
  badge = excluded.badge,
  top_notes = excluded.top_notes,
  heart_notes = excluded.heart_notes,
  base_notes = excluded.base_notes,
  sort_order = excluded.sort_order,
  updated_at = now();
