import type { CollectionEntry, CollectionKey } from "astro:content";
import type { TadaDocumentNode } from "gql.tada";

export type getQueryReturnType<T extends TadaDocumentNode<{}, {}, {}>> =
	ReturnType<Awaited<NonNullable<T["__apiType"]>>>;

export type getCollectionEntryType<C extends CollectionKey> =
	CollectionEntry<C>["data"];
