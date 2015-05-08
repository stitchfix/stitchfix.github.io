module Jekyll
  module Members
    def find_member(teams, id)
      if !id
        return
      end

      single = ''

      teams.each do |team|
        single = team['members'].select do |member|
          member['id'] == id
        end
      end

      single[0]
    end

    def team(teams, name)
      teams.select do |team|
        team['teamname'] == name
      end
    end

    def team_name(id, teams)
      name = teams.select do |team|
        team['id'] == id
      end

      name[0]['name']
    end
  end
end

Liquid::Template.register_filter(Jekyll::Members)
