"use client";

import { BellRing } from "lucide-react";
import { FC } from "react";

import { useNotificationStore } from "~/app/dashboard/(user-dashboard)/settings/notification/action/notification-store";
import { notificationSettingsProperties } from "~/app/dashboard/(user-dashboard)/settings/notification/types/notification-settings.types";
import CustomButton from "~/components/common/common-button/common-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

interface NotificationPreview {
  header: string;
  time: string;
}

interface CardProperties extends React.ComponentProps<typeof Card> {
  notificationsPreview: NotificationPreview[];
  unreadCount: number;
}

const UnreadNotificationCard: FC<CardProperties> = ({
  className,
  notificationsPreview = [],
  unreadCount = 0,
  ...properties
}) => {
  const { settings, updateSettings } = useNotificationStore();

  const handleToggleSwitch = (name: keyof notificationSettingsProperties) => {
    updateSettings({ [name]: !settings[name] });
  };

  return (
    <Card
      data-testid="cardContainer"
      className={cn("h-fit w-fit sm:w-[380px]", className)}
      {...properties}
    >
      <CardHeader className="px-4 sm:p-6">
        <CardTitle>Notifications</CardTitle>
        <CardDescription data-testid="unreadMessageCount">
          You have {unreadCount === 0 ? 0 : unreadCount} unread message
          {unreadCount === 1 ? "" : "s"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex items-center space-x-4 rounded-md border p-2 sm:p-4">
          <BellRing size={16} />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch
            checked={settings.mobile_push_notifications}
            onCheckedChange={() =>
              handleToggleSwitch("mobile_push_notifications")
            }
            name="mobile_push_notifications"
          />
        </div>
        <div data-testid="previewBody">
          {notificationsPreview.map((preview, index) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0 sm:mb-4"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p
                  data-testid={`previewHeader${index}`}
                  className="text-sm font-medium leading-none"
                >
                  {preview.header}
                </p>
                <p
                  data-testid={`previewTime${index}`}
                  className="text-sm text-muted-foreground"
                >
                  {preview.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <div className="item-center flex w-full">
          <CustomButton
            variant="primary"
            isDisabled={unreadCount === 0}
            className="w-full bg-primary"
            onClick={() => {
              // MARK ALL NOTIFICATION LOGIC
            }}
          >
            Mark all as read
          </CustomButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UnreadNotificationCard;
