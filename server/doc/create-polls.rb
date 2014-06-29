teacher_user_id = 1
student_user_id = 1
course_id = 1

# insert a bunch of results for shared results
poll_user_ids = 6..36

Polling::Poll.destroy_all()
Polling::PollChoice.destroy_all()
Polling::PollSession.destroy_all()
Polling::PollSubmission.destroy_all()

poll = Polling::Poll.create(question: "What are you going to get on the final?")
poll.user_id = teacher_user_id
poll.save!
poll.poll_choices.create(:text => "A", :position => 1, :is_correct => true)
choice = poll.poll_choices.create(:text => "B", :position => 2, :is_correct => false)
poll.poll_choices.create(:text => "C", :position => 3, :is_correct => false)
poll.poll_choices.create(:text => "D", :position => 4, :is_correct => false)
poll.poll_choices.create(:text => "F", :position => 5, :is_correct => false)
sess = poll.poll_sessions.new(:course_id => course_id)
sess.has_public_results = false
sess.is_published = true
sess.save!
sub = sess.poll_submissions.new
sub.poll_id = poll.id
sub.poll_choice_id = choice.id
sub.user_id = student_user_id
sub.save!
sess.close!

poll = Polling::Poll.create(question: "What movie is the greatest of all-time?")
poll.user_id = teacher_user_id
poll.save!
c1 = poll.poll_choices.create(:text => "The Big Lebowski", :position => 1, :is_correct => true)
c2 = poll.poll_choices.create(:text => "Star Wars: Episode V", :position => 2, :is_correct => false)
c3 = poll.poll_choices.create(:text => "The Godfather", :position => 3, :is_correct => false)
c4 = poll.poll_choices.create(:text => "The Shawshank Redemption", :position => 4, :is_correct => false)
sess = poll.poll_sessions.new(:course_id => course_id)
sess.has_public_results = true
sess.is_published = true
sess.save!
sub = sess.poll_submissions.new
sub.poll_id = poll.id
sub.poll_choice_id = c2.id
sub.user_id = student_user_id
sub.save!

poll_user_ids.each do |id|
  next unless user = User.find_by_id(id)

  sub = sess.poll_submissions.new
  sub.poll_id = poll.id
  sub.poll_choice_id = [c1, c2, c3, c4].rand.id
  sub.user_id = user.id
  sub.save!
end

sess.close!


# ------------

poll = Polling::Poll.create(question: "What soccer team is going to win the World Cup?")
poll.user_id = teacher_user_id
poll.save!
poll.poll_choices.create(:text => "Ghana", :position => 1, :is_correct => false)
choice = poll.poll_choices.create(:text => "USA", :position => 2, :is_correct => true)
poll.poll_choices.create(:text => "Portugal", :position => 3, :is_correct => false)
poll.poll_choices.create(:text => "England", :position => 4, :is_correct => false)
sess = poll.poll_sessions.new(:course_id => course_id)
sess.has_public_results = false
sess.is_published = true
sess.save!
sub = sess.poll_submissions.new
sub.poll_id = poll.id
sub.poll_choice_id = choice.id
sub.user_id = student_user_id
sub.save!

poll = Polling::Poll.new(question: "What is your favorite color?")
poll.user_id = teacher_user_id
poll.save!
poll.poll_choices.create(:text => "Green", :position => 1, :is_correct => false)
poll.poll_choices.create(:text => "Yellow", :position => 2, :is_correct => false)
poll.poll_choices.create(:text => "Red", :position => 3, :is_correct => false)
poll.poll_choices.create(:text => "Blue", :position => 4, :is_correct => true)
sess = poll.poll_sessions.new(:course_id => course_id)
sess.has_public_results = false
sess.is_published = true
sess.save!

poll = Polling::Poll.new(question: "Who is your favorite Arrested Development character?")
poll.user_id = teacher_user_id
poll.save!
poll.poll_choices.create(:text => "Tobias Funke", :position => 1, :is_correct => false)
poll.poll_choices.create(:text => "Gob Bluth", :position => 2, :is_correct => false)
poll.poll_choices.create(:text => "George Michael Bluth", :position => 3, :is_correct => false)
poll.poll_choices.create(:text => "Steve Holt", :position => 4, :is_correct => false)
sess = poll.poll_sessions.new(:course_id => course_id)
sess.has_public_results = false
sess.is_published = true
sess.save!
