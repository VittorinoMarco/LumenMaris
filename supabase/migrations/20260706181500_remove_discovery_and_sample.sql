-- Rimuove Discovery Set e Sample Kit dal catalogo
delete from public.products
where slug in ('discovery-set', 'sample-kit');
