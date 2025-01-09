import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  // ExecutionContext: 들어온 요청을 확인, 그 정보를 갖고 있음.
  // data: 넘어온 매개변수 값이 담겨있음음
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
