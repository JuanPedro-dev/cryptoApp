export interface User {
  id: string;
  name: string;
  password: string;
  favoritesCryptosName: string[]
}

export class User implements User {
  constructor(user?: User) {
    this.id = user?.id ?? '';
    this.name = user?.name ?? '';
    this.password = user?.password ?? '';
    this.favoritesCryptosName = user?.favoritesCryptosName ?? [];
  }
}