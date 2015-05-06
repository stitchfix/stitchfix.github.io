module Jekyll
  module Members
    def find_member(teams, id)
      if !id
        return
      end

      single = ''

      teams.each do |team|
        single = team['members'].select { |member|
          member['id'] == id
        }
      end

      single[0]
    end
  end
end

Liquid::Template.register_filter(Jekyll::Members)
