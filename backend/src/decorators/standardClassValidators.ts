import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  ValidationOptions,
} from 'class-validator';

export type CValidateOptions = {
  errorMessage?: string;
  validationOptions?: ValidationOptions;
};

/**
 * @see https://github.com/michihiko-karino/sakenowa-data-prj-rest-api/blob/master/src/decorators/standardClassValidators.ts
 */
const buildValidationOptions = (
  defaultMessage: string,
  options?: CValidateOptions,
): ValidationOptions => {
  let validationOptions: ValidationOptions = {};
  let prefixMessage = '';

  if (options?.validationOptions)
    validationOptions = options?.validationOptions;
  if (validationOptions.each) prefixMessage = 'それぞれの';

  validationOptions.message = options?.errorMessage
    ? options?.errorMessage
    : `${prefixMessage}${defaultMessage}`;
  return validationOptions;
};

export const CIsInt = (
  propertyName: string,
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsInt(
    buildValidationOptions(`${propertyName}は数値を指定してください`, options),
  );
};

export const CIsNotEmpty = (
  propertyName: string,
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsNotEmpty(
    buildValidationOptions(`${propertyName}は必ず指定してください`, options),
  );
};

export const CIsString = (
  propertyName: string,
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsString(
    buildValidationOptions(
      `${propertyName}は文字列を指定してください`,
      options,
    ),
  );
};

export const CIsPositive = (
  propertyName: string,
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsPositive(
    buildValidationOptions(
      `${propertyName}は0以上の数字を指定してください`,
      options,
    ),
  );
};

export const CIsIn = (
  propertyName: string,
  values: unknown[],
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsIn(
    values,
    buildValidationOptions(
      `${propertyName}は${values.join(',')}のいずれかの値を指定してください`,
      options,
    ),
  );
};

export const CIsBoolean = (
  propertyName: string,
  options?: CValidateOptions,
): PropertyDecorator => {
  return IsBoolean(
    buildValidationOptions(
      `${propertyName}はtrue,もしくはfalseを指定してください`,
      options,
    ),
  );
};

export const CLength = (
  propertyName: string,
  min: number,
  max?: number,
  options?: CValidateOptions,
): PropertyDecorator => {
  return Length(
    min,
    max,
    buildValidationOptions(`${propertyName}は数値を指定してください`, options),
  );
};
