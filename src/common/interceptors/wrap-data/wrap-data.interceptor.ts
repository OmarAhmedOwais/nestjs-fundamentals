import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // logic : Intercept Request
    console.log('Before , Request Intercepting....', context);
    return next.handle().pipe(
      map((data) => {
        // logic : Intercept Response
        console.log('After , Response Intercepting....', data);
        return data; // You should return the data after processing it
      }),
    );
  }
}
