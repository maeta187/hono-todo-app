export type Bindings = {
	HONO_TODO: KVNamespace;
};

declare global {
	function getMiniflareBindings(): Bindings;
}
