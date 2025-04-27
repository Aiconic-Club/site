// next-types.d.ts
import { Metadata } from 'next';

declare module 'next' {
  export interface PageProps {
    params: Promise<any>;
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}