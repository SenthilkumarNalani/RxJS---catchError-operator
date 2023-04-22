// catchError() -  It can be used to provide a fallback source in case the original source fails.
// So, this operator won't change the emitted values and complete notifications. It will just pass them through in an unchanged form.
// This operator is interested in the error notifications only. 'catchError' allows us to provide a fallback Observable which will be used in case the original source emits an error. If that would happen the catchError's logic would not reemit that error, but subscribe to the provided fallback Observable instead.
// And all notifications received by this new inner Subscription will be passed to the output, including an error or complete notification. So if the fallback Observable would error, it will be the final error ending the main Subscription..

import { Observable, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Output:
// App started
// fallback value
// const failingHttpRequest$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.error(new Error('Timeout'));
//   }, 3000);
// });

// console.log('App started');

// failingHttpRequest$
//   .pipe(catchError((error) => of('fallback value')))
//   .subscribe((value) => console.log(value));

// Note: And sometimes we don't want to provide any fallback value if something fails,but, instead, we would like to just catch the error and not show anything.
// How can we do this? Let's have a look at another interesting Observable provided by RxJS.
//  let's introduce a built-in Observable provided by RxJS. It's called 'EMPTY' and this Observable is empty, as it says. So once you subscribe to it, it doesn't emit any values.It will immediately complete instead.
// This is useful if you would like to hide the error notification from your Observer, but don't want to provide any fallback values.
// Sometimes we just want to hide the error from the source so it won't cause red unhandled errors in the console. In that case, let's use EMPTY Observable as our fallback in case of an error.
// export const EMPTY = new Observable(subscriber => subscriber.complete());
// As we now know, the EMPTY Observable will immediately emit a complete notification. And this complete notification will be passed to the output, to our Observer, our Subscription, so it will gracefully finish our Subscription without any errors.
const failingHttpRequest$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error(new Error('Timeout'));
  }, 3000);
});

console.log('App started');

failingHttpRequest$.pipe(catchError((error) => EMPTY)).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log('Completed'),
});
