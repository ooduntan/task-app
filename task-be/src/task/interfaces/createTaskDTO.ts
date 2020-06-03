import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator'
import { Transform } from "class-transformer";

export class CreateTaskDTO {
  @IsString()
  @IsOptional()
  description?: string = '' ;

  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(it => {
    switch (it) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return it;
    }
  })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean = true;

  @Transform(it => {
    switch (it) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return it;
    }
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean = false;
}