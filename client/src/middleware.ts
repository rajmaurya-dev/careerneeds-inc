import { authMiddleware} from '@clerk/nextjs';
import { NextResponse } from 'next/server';
 
export default authMiddleware({
  publicRoutes: ["/", "/sign-up"],

  

  // afterAuth(auth, req, evt) {
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     const home = new URL('/', req.url)
  //     return NextResponse.redirect(home)
  //   }
  //   if (auth.userId && !auth.isPublicRoute) {
  //     return NextResponse.next()
  //   }
  //   return NextResponse.next();
  // }
  
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/","/(api|trpc)(.*)"],
};