import { Admin } from "@repo/ui/admin";
import { InputBox } from "@repo/ui/input-box";

export default function AdminPage() {
  return (
    <div>
      <p>Hi From Admin Page</p>
      <Admin />
      <InputBox />
    </div>
  );
}
