import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { SkillItem } from "../types";

interface SkillsFormProps {
  skills: SkillItem[];
  updateSkills: (skills: SkillItem[]) => void;
}

export const SkillsForm = ({ skills, updateSkills }: SkillsFormProps) => {
  const addSkill = () => {
    const newSkill: SkillItem = {
      id: crypto.randomUUID(),
      name: "",
      level: "Intermediate"
    };
    updateSkills([...skills, newSkill]);
  };

  const updateItem = (id: string, updates: Partial<SkillItem>) => {
    updateSkills(skills.map(skill => 
      skill.id === id ? { ...skill, ...updates } : skill
    ));
  };

  const removeItem = (id: string) => {
    updateSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="space-y-3">
      <Button 
        onClick={addSkill} 
        variant="outline" 
        size="sm" 
        className="w-full flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Skill
      </Button>

      {skills.map((skill) => (
        <Card key={skill.id} className="relative">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-between">
              Skill Entry
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(skill.id)}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor={`skillName-${skill.id}`} className="text-xs">Skill Name</Label>
              <Input
                id={`skillName-${skill.id}`}
                value={skill.name}
                onChange={(e) => updateItem(skill.id, { name: e.target.value })}
                placeholder="JavaScript, Python, etc."
                className="text-xs"
              />
            </div>
            
            <div>
              <Label htmlFor={`skillLevel-${skill.id}`} className="text-xs">Level</Label>
              <Select
                value={skill.level}
                onValueChange={(value) => updateItem(skill.id, { level: value as SkillItem['level'] })}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};