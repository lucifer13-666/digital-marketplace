"use client";

import { State, UpdateUserSettings } from "@/app/actions";
import SubmitButtons from "@/components/SubmitButtons";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForm({ firstName, lastName, email }: iAppProps) {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initalState);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
    } else if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      {/* Header */}
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input name="email" type="email" disabled defaultValue={email} />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        <SubmitButtons title="Update your settings" />
      </CardFooter>
    </form>
  );
}
