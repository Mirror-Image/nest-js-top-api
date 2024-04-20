import { TopLevelCategoryEnum } from '../top-page/top-page.model';

type routeMapType = Record<TopLevelCategoryEnum, string>;

export const CATEGORY_URL: routeMapType = {
	0: '/courses',
	1: 'services',
	2: '/books',
	3: '/products'
};
