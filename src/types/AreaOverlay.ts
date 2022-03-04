
export interface AreaOverlay {
	id: number,
	vertices: Vertice[],
	event?: OverlayAction,
	seekTime?: number,
	startTime?: { hour: number, minute: number, second: number },
	stopTime?: { hour: number, minute: number, second: number },
}

enum OverlayAction {
	Seek = 'seek',
	Link = 'link',
}

export type Vertice = {
	x: number,
	y: number,
}
