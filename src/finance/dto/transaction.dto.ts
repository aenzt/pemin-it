import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TransactionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  jumlah: bigint;

  @IsNotEmpty()
  @IsString()
  penjual: string;

  @IsString()
  catatan: string;

  @IsString()
  bukti: string;

  @IsString()
  jenis: string;
}
