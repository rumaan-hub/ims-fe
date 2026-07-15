"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface StepProps {
  title: string;
  isCompleted?: boolean
  isActive?: boolean
  icon: React.ReactNode
  onClick?: () => void
  isLast?: boolean
  isConnectorCompleted?: boolean
  stepIndex?: number
}

const Step: React.FC<StepProps> = ({ title, isCompleted, isActive, icon, onClick, isLast, isConnectorCompleted, stepIndex }) => {
  const isReviewOrderPending = stepIndex === 3 && !isCompleted && !isActive
  const isClickable = isCompleted
  return (
    <div className={`flex flex-col items-center relative ${isClickable ? 'cursor-pointer' : 'cursor-default'}`} onClick={isClickable ? onClick : undefined}>
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-12 h-12 max-[600px]:h-10 max-[600px]:w-10 rounded-full border-2 flex items-center justify-center transition-colors z-10",
            isCompleted
              ? "border-green-500 bg-green-500 text-white"
              : isActive
                ? "border-green-500 bg-white text-green-500"
                : "border-gray-300 bg-white text-gray-400",
          )}
        >
          <div className={cn("w-5 h-5 max-[600px]:h-4 max-[600px]:w-4 flex justify-center items-center", isReviewOrderPending ? "text-[#FFA600]" : "")}>{icon}</div>
        </div>
        {!isLast && (
          <div
            className={cn(
              "absolute left-6 w-[calc(100vw/4-104px)] max-[1460px]:w-[calc(100vw/4-74px)] max-[835px]:w-[calc(100vw/4-50px)] max-[740px]:w-[calc(100vw/4-10px)] max-[580px]:w-[calc(100vw/4-0px)] h-[3px] z-0 transition-colors",
              isConnectorCompleted ? "bg-green-500" : "bg-gray-300",
            )}
          />
        )}
      </div>
      <div className="mt-3">
        <p
          className={cn(
            "text-[12px] max-[768px]:text-[11px] font-medium text-center",
            isActive ? "text-green-500" : isCompleted ? "text-gray-500" : "text-gray-500",
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

interface StepperProps {
  steps: Array<{ title: string; icon: React.ReactNode }>
  currentStep: number
  onStepChange: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full max-w-5xl max-[1640px]:max-w-4xl max-[1345px]:max-w-3xl max-[1175px]:max-w-2xl max-[1050px]:max-w-xl max-[920px]:max-w-lg mx-auto">
      <div className="flex justify-between items-start">
        {steps.map((step, index) => (
          <Step
            key={step.title}
            title={step.title}
            isCompleted={index < currentStep}
            isActive={index === currentStep}
            icon={step.icon}
            onClick={() => onStepChange(index)}
            isLast={index === steps.length - 1}
            isConnectorCompleted={index < currentStep}
            stepIndex={index}
          />
        ))}
      </div>
    </div>
  )
}
