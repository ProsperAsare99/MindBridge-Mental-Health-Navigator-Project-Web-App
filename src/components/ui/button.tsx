import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground shadow-premium hover:brightness-110 hover:shadow-lg",
                secondary: "bg-secondary text-secondary-foreground hover:brightness-110",
                outline: "border-2 border-primary/30 bg-transparent hover:bg-primary/10 text-primary hover:border-primary/50",
                ghost: "hover:bg-primary/15 text-primary",
                glass: "glass text-foreground hover:bg-foreground/[0.08] dark:hover:bg-white/10",
            },
            size: {
                sm: "h-9 px-4 rounded-xl text-xs",
                md: "h-11 px-6",
                lg: "h-14 px-10 text-base",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
)

export interface ButtonProps
    extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : motion.button

        return (
            // @ts-ignore
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
