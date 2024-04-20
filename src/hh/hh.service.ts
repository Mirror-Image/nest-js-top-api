import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { API_URL, CLUSTER_FIND_ERROR, NUMBER_REGEX, SALARY_CLUSTER_ID } from './hh.constants';
import { HhResponse } from './hh.models';
import { HHData } from '../top-page/top-page.model';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HhService {
	private token: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
	) {
		this.token = this.configService.get<string>('HH_TOKEN') ?? '';
	}

	async getData(text: string) {
		try {
			const { data } = await firstValueFrom(this.httpService.get<HhResponse>(API_URL.vacancies, {
				params: {
					clusters: true,
					text
				},
				headers: {
					'User-Agent': 'OwlTop/1.0 (mail@mail.com)',
					'Authorization': `Bearer ${this.token}`
				}
			}));

			return this.parseData(data);

		} catch (error) {
			Logger.error(error);
		}
	}

	private parseData(data: HhResponse): HHData {
		const salaryCluster = data.clusters.find((cluster) => cluster.id === SALARY_CLUSTER_ID);

		if (!salaryCluster) {
			throw new Error(CLUSTER_FIND_ERROR);
		}

		return {
			count: data.found,
			juniorSalary: this.getSalaryFromString(salaryCluster.items[1].name),
			middleSalary: this.getSalaryFromString(
				salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name
			),
			seniorSalary: this.getSalaryFromString(
				salaryCluster.items[salaryCluster.items.length - 1].name
			),
			updatedAt: new Date(),
		};
	}

	private getSalaryFromString(s: string): number {
		const res = s.match(NUMBER_REGEX);

		if (!res) {
			return 0;
		}

		return Number(res[0]);
	}
}
