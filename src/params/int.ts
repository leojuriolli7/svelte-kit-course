import type { ParamMatcher } from '@sveltejs/kit';

// name needs to be `match`
export const match: ParamMatcher = (param) => {
	return Number.isInteger(+param) && +param > 0;
};
