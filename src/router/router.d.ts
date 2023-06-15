// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { _RouteRecordBase } from 'vue-router';

declare module 'vue-router' {
  interface _RouteRecordBase {
    hidden?: boolean;
  }
}
