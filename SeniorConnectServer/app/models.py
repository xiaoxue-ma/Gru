__author__ = 'Xiaoxue'

from app.utility.general import convert_to_string
from app import db, dec_base
from sqlalchemy.ext.associationproxy import association_proxy


# <editor-fold desc="Association Table Entities">
class CommentUserLikeAssociation(db.Model):
    __table__ = dec_base.metadata.tables['comment_user_like']
    user = db.relationship('User', backref='comment_user_like_association')
    comment = db.relationship('Comment', backref='comment_user_like_association')


class StatusTagAssociation(db.Model):
    __table__ = dec_base.metadata.tables['status_tag']
    tag = db.relationship('Tag', backref='status_tag_association')
    status = db.relationship('Status', backref='status_tag_association')


class StatusUserLikeAssociation(db.Model):
    __table__ = dec_base.metadata.tables['status_user_like']
    user = db.relationship('User', backref='status_user_like_association')
    status = db.relationship('Status', backref='status_user_like_association')


class UserUserAssociation(db.Model):
    __table__ = dec_base.metadata.tables['user_user']


class UserChatgroupAssociation(db.Model):
    __table__ = dec_base.metadata.tables['user_chatgroup']
    user = db.relationship('User', backref='user_chatgroup_association')
    chatgroup = db.relationship('Chatgroup', backref='user_chatgroup_association')

# Exception: separate this table to manage friendship
user_user_table = dec_base.metadata.tables['user_user']
# </editor-fold>


class Chatgroup(db.Model):
    __table__ = dec_base.metadata.tables['chatgroup']
    all_users_in_group = association_proxy('user_chatgroup_association', 'user')

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class ChatMessage(db.Model):
    __table__ = dec_base.metadata.tables['chat_message']
    author = db.relationship('User', foreign_keys='ChatMessage.from_user_id')
    recipient = db.relationship('User', foreign_keys='ChatMessage.to_user_id')

    def as_dict(self):
        return {c.name: convert_to_string(getattr(self, c.name)) for c in self.__table__.columns}


class GroupChatMessage(db.Model):
    __table__ = dec_base.metadata.tables['group_chat_message']
    author = db.relationship('User', foreign_keys='GroupChatMessage.from_user_id')
    recipient = db.relationship('Chatgroup', foreign_keys='GroupChatMessage.to_group_id')

    def as_dict(self):
        return {c.name: convert_to_string(getattr(self, c.name)) for c in self.__table__.columns}


class Relationship(db.Model):
    __table__ = dec_base.metadata.tables['relationship']

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Question(db.Model):
    __table__ = dec_base.metadata.tables['question']

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Comment(db.Model):
    __table__ = dec_base.metadata.tables['comment']

    author = db.relationship('User', foreign_keys='Comment.sent_by_user_id')
    recipient = db.relationship('User', foreign_keys='Comment.send_to_user_id')
    users_who_liked_this = association_proxy('comment_user_like_association', 'user')

    def __repr__(self):
        return str(self.text_content)

    def as_dict(self):
        d = {c.name: convert_to_string(getattr(self, c.name)) for c in self.__table__.columns}
        # user from and user to
        d['from_user'] = self.author.name
        d['to_user'] = self.recipient.name
        return d


class Status(db.Model):
    __table__ = dec_base.metadata.tables['status']

    tags = association_proxy('status_tag_association', 'tag')
    comments = db.relationship('Comment', backref='status', lazy='dynamic')
    picture_contents = db.relationship('Picture', backref='status', lazy='dynamic')
    users_who_liked_this = association_proxy('status_user_like_association', 'user')
    teachable_agent_question = db.relationship('Question', backref='statuses')

    def __repr__(self):
        return str(self.text_content)

    def as_dict(self):
        d = {c.name: convert_to_string(getattr(self, c.name)) for c in self.__table__.columns}
        # author details
        au = self.author
        au.fetch_relationship_detail(User.query.get(self.user_id))
        d['author'] = au.as_dict()
        # picture details
        pic = self.picture_contents
        d['picture_contents'] = [i.as_dict() for i in pic]
        # liked by
        d['likes'] = [i.as_dict() for i in self.users_who_liked_this]
        # comments
        d['comments'] = [i.as_dict() for i in self.comments.order_by(Comment.id)]
        #tags
        d['tags'] = [i.as_dict() for i in self.tags]
        return d


class Picture(db.Model):
    __table__ = dec_base.metadata.tables['picture']

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Tag(db.Model):
    __table__ = dec_base.metadata.tables['tag']

    def __repr__(self):
        return str(self.text_content)

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(db.Model):
    # table construction and foreign keys
    __table__ = dec_base.metadata.tables['user']
    statuses = db.relationship('Status', backref='author', lazy='dynamic')
    friends = db.relationship('User', secondary=user_user_table,
                             primaryjoin=user_user_table.c.user_id1==__table__.c.ID,
                             secondaryjoin=user_user_table.c.user_id2==__table__.c.ID,
                             lazy='dynamic')
    relationship_groups = db.relationship('Relationship',
                                          backref='relationship_group_owner',
                                          lazy='dynamic')


    user_user_association_by_id2 = db.relationship('UserUserAssociation',
                                            primaryjoin=user_user_table.c.user_id2==__table__.c.ID,
                                            lazy='dynamic')

    all_groups_user_in = association_proxy('user_chatgroup_association', 'chatgroup')

    # relationship and nickname for web display purpose.
    # they can be left blank
    relationship = ''
    nickname = ''
    status = ''

    def fetch_relationship_detail(self, from_user):
        # if it is myself
        if from_user.ID == self.ID:
            self.relationship = 'Me'
            self.nickname = self.name
            self.status = 'pending'
        else:
            instance = self.user_user_association_by_id2.filter_by(user_id1=from_user.ID).first()
            if instance:  # if there is a friend relationship
                self.relationship = instance.relationship
                self.nickname = instance.nickname if instance.nickname != '' else self.name
                self.status = instance.status
            else:  # if they are not friends
                self.relationship = ''
                self.nickname = self.name
                self.status = ''

    def __repr__(self):
        return str(self.name)

    def as_dict(self):
        d = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        d['relationship'] = self.relationship
        d['nickname'] = self.nickname
        return d

    @staticmethod
    def load_from_json(data):
        return User(name=data['name'],
                    phone_number=data['phone_number'],
                    password=data['password'],
                    verification_status='pending')