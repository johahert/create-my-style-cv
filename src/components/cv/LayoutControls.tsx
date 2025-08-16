import { Columns2, Columns, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVLayout } from "./types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LayoutControlsProps {
  layout: CVLayout;
  updateLayout: (updates: Partial<CVLayout>) => void;
}

const SortableSection = ({ id, title }: { id: string; title: string }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-2 p-2 bg-muted rounded-md cursor-grab active:cursor-grabbing border"
    >
      <GripVertical className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">{title}</span>
    </div>
  );
};

export const LayoutControls = ({ layout, updateLayout }: LayoutControlsProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sectionTitles: Record<string, string> = {
    experience: "Experience",
    education: "Education", 
    skills: "Skills",
    customSections: "Custom Sections"
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = layout.sectionOrder.indexOf(active.id as string);
      const newIndex = layout.sectionOrder.indexOf(over.id as string);
      
      const newOrder = arrayMove(layout.sectionOrder, oldIndex, newIndex);
      updateLayout({ sectionOrder: newOrder });
    }
  };

  const toggleColumns = () => {
    updateLayout({ 
      columns: layout.columns === 1 ? 2 : 1,
      leftColumnSections: layout.columns === 1 ? layout.sectionOrder.slice(0, 2) : [],
      rightColumnSections: layout.columns === 1 ? layout.sectionOrder.slice(2) : []
    });
  };

  const moveToColumn = (sectionId: string, column: 'left' | 'right') => {
    const leftSections = layout.leftColumnSections.filter(id => id !== sectionId);
    const rightSections = layout.rightColumnSections.filter(id => id !== sectionId);
    
    if (column === 'left') {
      updateLayout({
        leftColumnSections: [...leftSections, sectionId],
        rightColumnSections: rightSections
      });
    } else {
      updateLayout({
        leftColumnSections: leftSections,
        rightColumnSections: [...rightSections, sectionId]
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Layout Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={layout.columns === 1 ? "default" : "outline"}
            size="sm"
            onClick={toggleColumns}
            className="flex items-center gap-1"
          >
            <Columns className="h-3 w-3" />
            Single
          </Button>
          <Button
            variant={layout.columns === 2 ? "default" : "outline"}
            size="sm"
            onClick={toggleColumns}
            className="flex items-center gap-1"
          >
            <Columns2 className="h-3 w-3" />
            Two Column
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-medium text-muted-foreground">Section Order</h4>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={layout.sectionOrder}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {layout.sectionOrder.map((sectionId) => (
                  <div key={sectionId} className="space-y-1">
                    <SortableSection
                      id={sectionId}
                      title={sectionTitles[sectionId] || sectionId}
                    />
                    {layout.columns === 2 && (
                      <div className="flex gap-1 ml-6">
                        <Button
                          variant={layout.leftColumnSections.includes(sectionId) ? "default" : "outline"}
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => moveToColumn(sectionId, 'left')}
                        >
                          Left
                        </Button>
                        <Button
                          variant={layout.rightColumnSections.includes(sectionId) ? "default" : "outline"}
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => moveToColumn(sectionId, 'right')}
                        >
                          Right
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </CardContent>
    </Card>
  );
};