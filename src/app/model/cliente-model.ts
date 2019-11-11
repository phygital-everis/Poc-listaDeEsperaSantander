export interface Cliente {

  id?: string;
  name: string;
  service: string;
  setor:string;
  hrChegada: number;
  chamado:boolean;
  mesa?: number;
}
