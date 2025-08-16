import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ExperienceItem } from "../types";

interface ExperienceFormProps {
  experience: ExperienceItem[];
  updateExperience: (experience: ExperienceItem[]) => void;
}

export const ExperienceForm = ({ experience, updateExperience }: ExperienceFormProps) => {
  const [showForm, setShowForm] = useState(false);

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false
    };
    updateExperience([...experience, newExp]);
    setShowForm(true);
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
    updateExperience(experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeItem = (id: string) => {
    updateExperience(experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={addExperience} 
        variant="outline" 
        size="sm" 
        className="w-full flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>

      {experience.map((exp) => (
        <Card key={exp.id} className="relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Experience Entry
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(exp.id)}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor={`position-${exp.id}`} className="text-xs">Position</Label>
              <Input
                id={`position-${exp.id}`}
                value={exp.position}
                onChange={(e) => updateItem(exp.id, { position: e.target.value })}
                placeholder="Software Engineer"
                className="text-xs"
              />
            </div>
            
            <div>
              <Label htmlFor={`company-${exp.id}`} className="text-xs">Company</Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) => updateItem(exp.id, { company: e.target.value })}
                placeholder="Tech Corp"
                className="text-xs"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`startDate-${exp.id}`} className="text-xs">Start Date</Label>
                <Input
                  id={`startDate-${exp.id}`}
                  value={exp.startDate}
                  onChange={(e) => updateItem(exp.id, { startDate: e.target.value })}
                  placeholder="Jan 2022"
                  className="text-xs"
                />
              </div>
              
              <div>
                <Label htmlFor={`endDate-${exp.id}`} className="text-xs">End Date</Label>
                <Input
                  id={`endDate-${exp.id}`}
                  value={exp.endDate}
                  onChange={(e) => updateItem(exp.id, { endDate: e.target.value })}
                  placeholder="Dec 2023"
                  disabled={exp.current}
                  className="text-xs"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) => 
                  updateItem(exp.id, { current: checked as boolean, endDate: checked ? "" : exp.endDate })
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="text-xs">Currently working here</Label>
            </div>
            
            <div>
              <Label htmlFor={`description-${exp.id}`} className="text-xs">Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => updateItem(exp.id, { description: e.target.value })}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-16 text-xs"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};