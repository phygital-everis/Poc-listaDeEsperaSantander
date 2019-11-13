export interface Cliente {

  id?: string;
  name: string;
  service: string;
  setor:string;
  timestamp: Date;
  chamado:boolean;
  mesa?: number;
}
