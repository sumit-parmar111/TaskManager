import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  getTeamMembersSummary(){
    var TeamMembersSummary=[
      {Region:"EAST",TeamMembersCount:20,TemporarilyUnavailableMembers:1},
      {Region:"WEST",TeamMembersCount:10,TemporarilyUnavailableMembers:8},
      {Region:"SOUTH",TeamMembersCount:12,TemporarilyUnavailableMembers:4},
      {Region:"NORTH",TeamMembersCount:24,TemporarilyUnavailableMembers:6}
    ];
    return TeamMembersSummary;
  }

}
