import { format } from 'date-fns';
import { cpf, cnpj } from 'cpf-cnpj-validator';

/**
 * Formata data para o padrão: yyyy-MM-dd HH:mm:ss
 * @param date Date
 */
export const formatDate = (date: Date | number) =>
  format(date, 'yyyy-MM-dd HH:mm:ss');

/**
 * Remove máscara de campos númericos.
 * @param str string
 */
export const removeNumericMask = (str: string) => str.replace(/\D+/g, '');

/**
 * Valida se CPF e CNPJ são válidos
 * @param str String
 * @retun Boolean
 */
export const validCpfCnpj = (str: string): boolean => {
  if (!cpf.isValid(str) && !cnpj.isValid(str)) return false;
  return true;
};

/**
 * Gera uma senha numérica de (x) digitos
 * @retun String
 */
export const generateNumericPass = (length = 4): string => {
  const chars = '0123456789';
  let pass = '';

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    pass += chars.substring(randomNumber, randomNumber + 1);
  }

  return pass;
};
