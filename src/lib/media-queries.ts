const BREAKPOINTS = {
	laptop: 1500,
	tablet: 1100,
	phone: 550
};

const QUERIES = {
	laptopMax: `(max-width: ${BREAKPOINTS.laptop / 16} rem)`,
	tabletMax: `(max-width: ${BREAKPOINTS.tablet / 16} rem)`,
	phoneMax: `(max-width: ${BREAKPOINTS.phone / 16} rem)`
};
