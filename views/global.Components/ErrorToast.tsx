"use client";
import React from 'react';
import { useToast, Toast, ToastTitle, ToastDescription } from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
    Icon,
    CheckCircleIcon,
    AlertCircleIcon,
    InfoIcon
} from "@/components/ui/icon";

type ToastActionType = "error" | "warning" | "success" | "info";

export function useShowToast() {
    const toast = useToast();

    const show = (action: ToastActionType, title: string, description?: string) => {
        let ToastIcon = InfoIcon;
        let borderColor = "border-info-500";
        let iconColor = "stroke-info-500";
        let titleColor = "text-info-500";

        // Determine styles based on action
        switch (action) {
            case "error":
                ToastIcon = AlertCircleIcon;
                borderColor = "border-error-500";
                iconColor = "stroke-error-500";
                titleColor = "text-error-500";
                break;
            case "warning":
                ToastIcon = AlertCircleIcon;
                borderColor = "border-warning-500";
                iconColor = "stroke-warning-500";
                titleColor = "text-warning-500";
                break;
            case "success":
                ToastIcon = CheckCircleIcon;
                borderColor = "border-success-500";
                iconColor = "stroke-success-500";
                titleColor = "text-success-500";
                break;
            case "info":
            default:
                ToastIcon = InfoIcon;
                borderColor = "border-info-500";
                iconColor = "stroke-info-500";
                titleColor = "text-info-500";
                break;
        }

        toast.show({
            placement: 'top',
            duration: 3000,
            render: ({ id }) => {
                const uniqueToastId = "toast-" + id;
                return (
                    <Toast
                        action={action}
                        variant="outline"
                        nativeID={uniqueToastId}
                        className={`p-4 gap-6 w-full shadow-hard-5 max-w-[443px] flex-row justify-between ${borderColor}`}
                    >
                        <HStack space="md">
                            <Icon
                                as={ToastIcon}
                                className={`${iconColor} mt-0.5`}
                            />
                            <VStack space="xs">
                                <ToastTitle className={`font-semibold ${titleColor}`}>
                                    {title}
                                </ToastTitle>
                                {description && (
                                    <ToastDescription size="sm">
                                        {description}
                                    </ToastDescription>
                                )}
                            </VStack>
                        </HStack>
                    </Toast>
                );
            },
        });
    };

    return {
        show,
        error: (title: string, description?: string) => show("error", title, description),
        success: (title: string, description?: string) => show("success", title, description),
        warning: (title: string, description?: string) => show("warning", title, description),
        info: (title: string, description?: string) => show("info", title, description),
    };
}