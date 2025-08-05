import { cookies } from "next/headers";

export abstract class NextCookieRepository<T> {
	protected abstract cookieName: string;
	private data: Record<string, T> = {};

	private async set() {
		(await cookies()).set(this.cookieName, JSON.stringify(this.data));
	}

	async init(data?: Record<string, T>): Promise<void> {
		if (!data) {
			const cookieData = (await cookies()).get(this.cookieName)?.value
			data = cookieData ? JSON.parse(cookieData) as Record<string, T> : {}
		}
		this.data = data;
	}

	protected async save(id: string, value: T): Promise<void> {
        if (!this.data) {
			console.warn(`It is possible that the cookie ${this.cookieName} has not been initialized.`)
		}
		this.data[id] = value;
		await this.set();
	}

	protected findById(id: string): T {
		const value = this.data[id];
		if (!value) {
			throw new Error("Value not found");
		}
		return value;
	}

	protected async deleteByIds(ids: string[]): Promise<void> {
		ids.forEach((id) => {
			if (!this.data[id]) {
				throw new Error("Id not found");
			}
			delete this.data[id];
		});
		await this.set();
	}

	protected async deleteAllIds(): Promise<void> {
		this.data = {};
		await this.set();
	}
}
