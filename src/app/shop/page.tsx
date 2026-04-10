"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

type SortOption = "default" | "price-asc" | "price-desc" | "name";
type FilterGender = "all" | "uomo" | "donna" | "unisex";

export default function ShopPage() {
  const [sort, setSort] = useState<SortOption>("default");
  const [filterGender, setFilterGender] = useState<FilterGender>("all");

  const filtered = products
    .filter((p) => filterGender === "all" || p.gender === filterGender)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-primary/90">
            Collezione
          </p>
          <h1 className="font-display mt-4 text-display-sm font-light tracking-[-0.02em] text-foreground">
            Shop
          </h1>
          <p className="editorial-body mt-6 max-w-2xl">
            Scopri Arcomagno e Thalasi, i primi profumi al mondo affinati a 35
            metri di profondità nel mare calabrese.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          <div>
            <label className="block text-sm font-medium mb-2">Filtra per</label>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value as FilterGender)}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm"
            >
              <option value="all">Tutti</option>
              <option value="uomo">Uomo</option>
              <option value="donna">Donna</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Ordina per</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-md border border-input bg-background px-4 py-2 text-sm"
            >
              <option value="default">Predefinito</option>
              <option value="price-asc">Prezzo: crescente</option>
              <option value="price-desc">Prezzo: decrescente</option>
              <option value="name">Nome</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
