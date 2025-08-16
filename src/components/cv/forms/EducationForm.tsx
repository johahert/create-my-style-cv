import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { EducationItem } from "../types";

interface EducationFormProps {
  education: EducationItem[];
  updateEducation: (education: EducationItem[]) => void;
}

export const EducationForm = ({ education, updateEducation }: EducationFormProps) => {
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: crypto.randomUUID(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false
    };
    updateEducation([...education, newEdu]);
  };

  const updateItem = (id: string, updates: Partial<EducationItem>) => {
    updateEducation(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeItem = (id: string) => {
    updateEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={addEducation} 
        variant="outline" 
        size="sm" 
        className="w-full flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </Button>

      {education.map((edu) => (
        <Card key={edu.id} className="relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Education Entry
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(edu.id)}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor={`degree-${edu.id}`} className="text-xs">Degree</Label>
              <Input
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => updateItem(edu.id, { degree: e.target.value })}
                placeholder="Bachelor of Science in Computer Science"
                className="text-xs"
              />
            </div>
            
            <div>
              <Label htmlFor={`institution-${edu.id}`} className="text-xs">Institution</Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => updateItem(edu.id, { institution: e.target.value })}
                placeholder="University Name"
                className="text-xs"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`startDate-${edu.id}`} className="text-xs">Start Date</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  value={edu.startDate}
                  onChange={(e) => updateItem(edu.id, { startDate: e.target.value })}
                  placeholder="Sep 2018"
                  className="text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor={`endDate-${edu.id}`} className="text-xs">End Date</Label>
                <Input
                  id={`endDate-${edu.id}`}
                  value={edu.endDate}
                  onChange={(e) => updateItem(edu.id, { endDate: e.target.value })}
                  placeholder="May 2022"
                  disabled={edu.current}
                  className="text-xs"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${edu.id}`}
                checked={edu.current}
                onCheckedChange={(checked) => 
                  updateItem(edu.id, { current: checked as boolean, endDate: checked ? "" : edu.endDate })
                }
              />
              <Label htmlFor={`current-${edu.id}`} className="text-xs">Currently studying here</Label>
            </div>
            
            <div>
              <Label htmlFor={`description-${edu.id}`} className="text-xs">Description</Label>
              <Textarea
                id={`description-${edu.id}`}
                value={edu.description}
                onChange={(e) => updateItem(edu.id, { description: e.target.value })}
                placeholder="Relevant coursework, achievements, GPA..."
                className="min-h-16 text-xs"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};