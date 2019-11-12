export interface Cliente {

  id?: string;
  name: string;
  service: string;
  setor:string;
  hrChegada: Date;
  chamado:boolean;
  mesa?: number;
}
