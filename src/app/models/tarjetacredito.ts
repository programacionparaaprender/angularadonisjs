export class TarjetaCredito {
  id?: number;
  titular: string;
  numero_tarjeta: string;
  fecha_expiracion: string;
  cvv: string;
  constructor(Titular: string, NumeroTarjeta: string, fechaExpiracion: string, CVV: string) {
    this.titular = Titular;
    this.numero_tarjeta = NumeroTarjeta;
    this.fecha_expiracion = fechaExpiracion;
    this.cvv = CVV;
  }
}


