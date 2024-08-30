import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  save(key: string, value: any) {
    if (this.isBrowser) {
      const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, storedValue);
    }
  }

  load(key: string): any {
    if (this.isBrowser) {
      const value = localStorage.getItem(key);
      try {
        return value ? JSON.parse(value) : null; // Esto funciona para JSON. No hay problema si el valor es una cadena.
      } catch (e) {
        return value; // Si no se puede parsear, devolvemos la cadena original.
      }
    }
    return null;
  }

  remove(key: string) {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}