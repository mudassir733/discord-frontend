
"use client";

import { useState, useEffect } from "react";

interface ResizableDivProps {
    children: React.ReactNode;
    initialWidth?: number;
    minWidth?: number;
    maxWidth?: number;
}

export default function ResizableDiv({
    children,
    initialWidth = 300,
    minWidth = 300,
    maxWidth = 500,
}: ResizableDivProps) {
    const [width, setWidth] = useState(initialWidth);
    const [isDragging, setIsDragging] = useState(false);


    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsDragging(true);
    };


    const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (!isDragging) return;

        const newWidth = e.clientX - 12;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            setWidth(newWidth);
        }
    };


    const handleMouseUp = () => {
        setIsDragging(false);
    };


    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, handleMouseMove]);

    return (
        <div className="relative flex">
            <div style={{ width: `${width}px `, }} className="relative overflow-y-auto custom-scrollbar bg-[#121214]">
                {children}
            </div>
            <div
                className="w-1 cursor-col-resize hover:bg-gray-500 transition-colors"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
}
