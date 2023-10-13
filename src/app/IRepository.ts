interface IRepository<TEntity> {
  search(): Promise<TEntity[]>;
  searchById(id: string): Promise<TEntity>;
  add(entity: TEntity): Promise<void>;
}

export { IRepository };
