import type * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeAlert } from "@/store/slices/alertSlice";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from "@/components/ui/credenza";
import { CloseCircle, Danger, TickCircle } from "iconsax-reactjs";

const dialogVariants = cva("font-bold text-2xl capitalize", {
    variants: {
        variant: {
            default: "text-secondary dark:text-secondary-foreground",
            success: "text-green-500",
            error: "text-red-500",
            loading: "text-sky-500",
            warning: "text-yellow-500",
            settings: "w-full text-muted-foreground",
        },
        icons: {
            variant: {
                success: "#ffff",
            },
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface DialogProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> { }

export interface LoadingProps extends DialogProps {
    title?: string;
    sub?: unknown;
    label?: string;
    placeholder?: string;
    current?: string;
    icon?: React.ReactNode;
    loaded?: boolean;
}

export function GlobalDialog({ className, icon }: LoadingProps) {
    const dispatch = useAppDispatch();
    const alertState = useAppSelector((state) => state.alert);

    useEffect(() => {
        // side-effects on open could go here if needed
    }, [alertState.loaded]);

    const closeDialog = () => {
        window.setTimeout(() => {
            dispatch(closeAlert());
        }, 300);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            window.setTimeout(() => {
                closeDialog();
            }, 300);
        }
    };

    return (
        <Credenza open={alertState.loaded} onOpenChange={handleOpenChange}>
            <CredenzaContent className="">
                <CredenzaHeader className="flex items-center text-center bg-accent flex-col gap-4">
                    <div className={cn(dialogVariants({ variant: alertState.variant }))}>
                        {alertState.variant === "success" && (
                            <TickCircle variant="Bold" size="60" />
                        )}
                        {alertState.variant === "loading" && "<LoadingIcon />"}
                        {alertState.variant === "error" && (
                            <CloseCircle variant="Bulk" size="80" />
                        )}
                        {alertState.variant === "warning" && (
                            <Danger variant="Bulk" size="80" />
                        )}
                    </div>
                    <CredenzaTitle className={"text-xl text-muted-foreground"}>
                        {alertState.title}
                    </CredenzaTitle>
                    <CredenzaDescription className="py-4 px-10">
                        {alertState.sub}
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaFooter className="">
                    <CredenzaClose className="hover:cursor-pointer">
                        <div onClick={closeDialog}>Close</div>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    );
}
