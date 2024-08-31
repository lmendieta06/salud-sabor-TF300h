// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoadingService {
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   public loading$ = this.loadingSubject.asObservable();
//   private hideTimeout: any;
//   private loading = false;






//   show(): void {
//     this.loadingSubject.next(true);
//   }

//   hide(): void {
//     this.loadingSubject.next(false);
//   }

//   // Método para garantizar que el spinner se oculte después de un tiempo mínimo
//   hideWithMinTime(minTime: number = 10000): void {
//     if (this.loading) {
//       this.hideTimeout = setTimeout(() => {
//         this.hide();
//       }, minTime);
//     } else {
//       this.hide();
//     }
//   }
// }

