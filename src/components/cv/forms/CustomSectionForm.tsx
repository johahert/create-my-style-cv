import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { CustomSection, CustomSectionItem } from "../types";

interface CustomSectionFormProps {
  customSections: CustomSection[];
  updateCustomSections: (customSections: CustomSection[]) => void;
}

export const CustomSectionForm = ({ customSections, updateCustomSections }: CustomSectionFormProps) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const addSection = () => {
    const newSection: CustomSection = {
      id: crypto.randomUUID(),
      title: "",
      items: []
    };
    updateCustomSections([...customSections, newSection]);
    setOpenSections(prev => new Set([...prev, newSection.id]));
  };

  const updateSection = (id: string, updates: Partial<CustomSection>) => {
    updateCustomSections(customSections.map(section => 
      section.id === id ? { ...section, ...updates } : section
    ));
  };

  const removeSection = (id: string) => {
    updateCustomSections(customSections.filter(section => section.id !== id));
    setOpenSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const addSectionItem = (sectionId: string) => {
    const newItem: CustomSectionItem = {
      id: crypto.randomUUID(),
      title: "",
      subtitle: "",
      description: "",
      date: ""
    };
    updateSection(sectionId, {
      items: [...(customSections.find(s => s.id === sectionId)?.items || []), newItem]
    });
  };

  const updateSectionItem = (sectionId: string, itemId: string, updates: Partial<CustomSectionItem>) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;
    
    const updatedItems = section.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    updateSection(sectionId, { items: updatedItems });
  };

  const removeSectionItem = (sectionId: string, itemId: string) => {
    const section = customSections.find(s => s.id === sectionId);
    if (!section) return;
    
    const updatedItems = section.items.filter(item => item.id !== itemId);
    updateSection(sectionId, { items: updatedItems });
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={addSection} 
        variant="outline" 
        size="sm" 
        className="w-full flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Custom Section
      </Button>

      {customSections.map((section) => {
        const isOpen = openSections.has(section.id);
        
        return (
          <Card key={section.id} className="relative">
            <Collapsible open={isOpen} onOpenChange={() => toggleSection(section.id)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <CollapsibleTrigger className="flex items-center gap-2 hover:text-primary">
                    {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    {section.title || "Custom Section"}
                  </CollapsibleTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor={`sectionTitle-${section.id}`} className="text-xs">Section Title</Label>
                    <Input
                      id={`sectionTitle-${section.id}`}
                      value={section.title}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      placeholder="e.g., Projects, Certifications, Awards"
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Items</Label>
                      <Button
                        onClick={() => addSectionItem(section.id)}
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Item
                      </Button>
                    </div>

                    {section.items.map((item) => (
                      <Card key={item.id} className="p-2 bg-muted/20">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs font-medium">Item</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSectionItem(section.id, item.id)}
                              className="h-4 w-4 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-2 w-2" />
                            </Button>
                          </div>
                          
                          <div>
                            <Label htmlFor={`itemTitle-${item.id}`} className="text-xs">Title</Label>
                            <Input
                              id={`itemTitle-${item.id}`}
                              value={item.title}
                              onChange={(e) => updateSectionItem(section.id, item.id, { title: e.target.value })}
                              placeholder="Item title"
                              className="text-xs h-6"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`itemSubtitle-${item.id}`} className="text-xs">Subtitle (optional)</Label>
                            <Input
                              id={`itemSubtitle-${item.id}`}
                              value={item.subtitle}
                              onChange={(e) => updateSectionItem(section.id, item.id, { subtitle: e.target.value })}
                              placeholder="Subtitle"
                              className="text-xs h-6"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`itemDate-${item.id}`} className="text-xs">Date (optional)</Label>
                            <Input
                              id={`itemDate-${item.id}`}
                              value={item.date}
                              onChange={(e) => updateSectionItem(section.id, item.id, { date: e.target.value })}
                              placeholder="2023"
                              className="text-xs h-6"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor={`itemDescription-${item.id}`} className="text-xs">Description</Label>
                            <Textarea
                              id={`itemDescription-${item.id}`}
                              value={item.description}
                              onChange={(e) => updateSectionItem(section.id, item.id, { description: e.target.value })}
                              placeholder="Description..."
                              className="min-h-12 text-xs"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};